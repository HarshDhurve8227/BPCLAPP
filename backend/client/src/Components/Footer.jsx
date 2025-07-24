import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-lg-start text-muted bg-dark text-white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <MDBBtn outline color='light' floating className='m-1' href='#!'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color='light' floating className='m-1' href='#!'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
          <MDBBtn outline color='light' floating className='m-1' href='#!'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
          <MDBBtn outline color='light' floating className='m-1' href='#!'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon='cubes' className='me-3' />
                Bharat Petroleum (LPG Division)
              </h6>
              <p>
                Empowering India’s kitchens with clean energy. Delivering LPG with safety, service and speed across the nation.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Quick Links</h6>
              <p><a href='#!' className='text-white'>Home</a></p>
              <p><a href='#!' className='text-white'>About Us</a></p>
              <p><a href='#!' className='text-white'>Services</a></p>
              <p><a href='#!' className='text-white'>Support</a></p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful</h6>
              <p><a href='#!' className='text-white'>Your Account</a></p>
              <p><a href='#!' className='text-white'>Feedback</a></p>
              <p><a href='#!' className='text-white'>Safety Guidelines</a></p>
              <p><a href='#!' className='text-white'>FAQs</a></p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p><MDBIcon icon='home' className='me-2' /> BPCL LPG Plant, India</p>
              <p><MDBIcon icon='envelope' className='me-2' /> support@bpcl.in</p>
              <p><MDBIcon icon='phone' className='me-2' /> +91 1800 22 4344</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        © {new Date().getFullYear()} BPCL | All rights reserved.
      </div>
    </MDBFooter>
  );
}
