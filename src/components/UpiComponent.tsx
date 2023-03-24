import React from 'react';
import { useRouter } from 'next/router';
import { add, groupBy } from 'lodash';
import { FadeLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { clearBasket, selectItems, selectTotal } from '../slices/basketSlice';
import { dbClient } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';

export default function UpiComponent({ session: authUser }) {
  // -1 invalid
  // 0 not verified
  // 1 verified
  const [verified, setVerified] = React.useState(0);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const groupedItems = Object.values(groupBy(items, 'id'));
  const transformedItems = groupedItems.map((group) => ({
    quantity: group.length,
    price_data: {
      currency: 'inr',
      unit_amount: group[0].price * 71 * 100,
      product_data: {
        name: group[0].title,
        images: [group[0].image],
        description: group[0].description,
      },
    },
  }));
  const groupedImages = Object.values(
    groupBy(
      items.map((item) => {
        return item.image.split('/').pop();
      })
    )
  ).map((group) => [group.length, group[0]]);

  const fulfillOrder = async (session) => {
    try {
      const images = JSON.parse(session.metadata.images).map((image) =>
        JSON.stringify(image)
      );
      await dbClient
        .collection('AMAZON_users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          amount_shipping: session.total_details.amount_shipping / 100,
          images: images,
          timestamp: new Date(),
          items: session.items,
        });
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
      // .then(() => {
      //   console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
      // })
      // .catch((err) => console.log('Error Occured!', err.message));
    } catch (err) {
      console.log(err.message);
    }
  };

  function UPIverify(address) {
    const addresses = ['rahul@ybl', 'rahul2@ybl'];
    const randomSeconds = Math.ceil(Math.random() * 10000);
    // console.log('randomSeconds', randomSeconds);
    setTimeout(() => {
      if (!addresses.includes(address)) {
        setVerified(-1);
        setAddress('');
        setShowSpinner(false);
        return;
      }
      setVerified(1);
      setShowSpinner(false);
    }, randomSeconds);
    setShowSpinner(true);
  }
  async function purchaseProducts() {
    try {
      // create order
      const session = {
        id: `UPI-${uuid()}`,
        metadata: {
          email: authUser.username,
          images: JSON.stringify(groupedImages),
        },
        amount_total: transformedItems.reduce((acc, item) => {
          return acc + item.price_data.unit_amount * item.quantity;
        }, 0),
        total_details: {
          amount_shipping: 400,
        },
        items: transformedItems.map((item) => {
          return {
            quantity: item.quantity,
            name: item.price_data.product_data.name,
          };
        }),
      };
      await fulfillOrder(session);
      dispatch(clearBasket({}));
      router.push('/success');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <input
        className='input w-[400px]'
        placeholder='Enter your VPA'
        type='text'
        value={address}
        onChange={(e) => {
          if (address == '') setVerified(0);
          setAddress(e.target.value);
        }}
      />
      {showSpinner ? (
        <FadeLoader
          color='#fff'
          height={8}
          width={2}
          radius={1}
          margin={1}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : verified == 1 ? (
        'verified'
      ) : verified == -1 ? (
        `Invalid VPA re-verify`
      ) : (
        <a
          href='#'
          onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            UPIverify(address);
          }}
          className='link'
          type='submit'
        >
          verify vpa
        </a>
      )}

      {verified == 1 && (
        <button className='btn' onClick={purchaseProducts}>
          Pay
        </button>
      )}
    </>
  );
}
