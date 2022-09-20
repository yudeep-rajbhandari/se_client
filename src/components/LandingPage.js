/** @format */

import React, { useState } from 'react';
import '../styles.css';
import Button from './shared/Button';
export default function LandingPage() {
  return (
    <>
      <div id='body'>
        <Header />
        <Card
          className='section'
          img='./Capture1.PNG'
          title='About Baylor'
          description='Baylor University'
        />
        <Button type='submit' version='secondary'>
          Register
        </Button>
        <Card
          className='section bg-grey'
          img='./Capture3.PNG'
          title='Our Values'
          description='Academic Integrity'
        />

        <Card
          className='section'
          img='./Capture1.PNG'
          title='Our Mission'
          description='Something'
        />
        <ContactContainer />
      </div>
    </>
  );
}

const Header = () => {
  return (
    <div className='header'>
      <span className='header-title'>GoBears!</span>
      <br />
      <span className='header-text'>Find your schedule</span>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={props.className}>
      <div className='small-div'>
        <i className={props.className}></i>
        <img src={props.img} alt='' />
      </div>

      <div className='big-div'>
        <span className='div-title'>{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};

const ContactContainer = () => {
  return (
    <div className='contact-container bg-grey'>
      <span className='div-title'>Contact us</span>
      <div className='contact-form'>
        <div id='sect1'>
          <span>Contact us and we will get back to you within 24 hours.</span>
          <span>
            <i className='fas fa-map-marker-alt'></i>
            GoBears
          </span>
          <span>
            <i className='fas fa-mobile-alt'></i>
            +123 456 7890
          </span>
          <span>
            <i className='far fa-envelope'></i>
            company.gmail.com
          </span>
        </div>

        <div id='sect2'>
          <span>Contact</span>

          <input
            type='text'
            placeholder='email address'
            className='input-field'
          />
          <textarea
            name=''
            id=''
            cols='30'
            rows='10'
            placeholder='comment'
          ></textarea>
          <button className='contact-btn'>Send</button>
        </div>
      </div>
    </div>
  );
};
