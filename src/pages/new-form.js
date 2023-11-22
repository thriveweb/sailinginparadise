import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import AlexBookingFormV2 from '../components/AlexBookingForm-v2'
import IntroText from '../components/IntroText'
import PageHeader from '../components/PageHeader'

import '../templates/Booking.css'

export default ({ children }) => {
  const title = 'BOOKING ENQUIRY'  

  return (
    <Layout>
      <Helmet>
        <title>New Form</title>
      </Helmet>
      <main className="Booking">

        <PageHeader title={title} />

        <section className="section Contact--Sections">
          <div className="container large">
            <div className="Contact--Section1">
              <IntroText />
            </div>
            <div className="Contact--Section2">
              <AlexBookingFormV2 />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
