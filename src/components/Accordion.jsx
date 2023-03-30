import { useState } from 'react';

function Accordion({ session, data }) {
  const [accordion, setAccordion] = useState(-1);
  function toggleAccordion(index, event) {
    if (
      accordion == index &&
      event.target.classList.contains('accordion__faq__item__title')
    ) {
      return setAccordion(-1);
    }
    setAccordion(index);
  }

  return (
    <>
      <div className='accordion__faq'>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className='accordion__faq__item'
              onClick={(e) => toggleAccordion(index, e)}
            >
              <div className='accordion__faq__item__title'>
                <h3 className='accordion__faq__item__title__heading'>
                  {item.title}
                </h3>
                <div className='accordion__faq__item__title__divider'>
                  {index == accordion ? '-' : '+'}
                </div>
              </div>
              {index == accordion && (
                <div className='accordion__faq__item__content'>
                  <p>{item.content}</p>
                  <div className='accordion__faq__item__content__component'>
                    {<item.component session={session} />}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Accordion;
