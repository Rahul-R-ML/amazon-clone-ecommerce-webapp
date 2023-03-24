import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import Accordion from '../../components/Accordion';
import { AuthContext } from '../../contexts/authContext';
import UpiComponent from '../../components/UpiComponent';
import StripeCheckout from '../../components/StripeCheckout';

const accordionData = [
  {
    title: 'UPI',
    content: 'Pay using UPI',
    component: UpiComponent,
  },
  {
    title: 'Cards',
    content: 'Pay using Cards',
    component: StripeCheckout,
  },
];

export default function Payments() {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  useEffect(() => {
    if (!session) router.push('/checkout');
  }, []);

  return (
    <div>
      <Accordion session={session} accordionData={accordionData} />
    </div>
  );
}
