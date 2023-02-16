import React, { useState } from 'react';
import sendIcon from '../assets/sendIcon.svg';
import {
	MDBInput,
	MDBCol,
	MDBRow,
	MDBBtn,
	MDBTextArea,
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalBody,
} from 'mdb-react-ui-kit';
import '../css/advertise.css';
// import { useNavigate } from 'react-router-dom';

export default function Advertisers() {
	const [basicModal, setBasicModal] = useState(false);
	const toggleShow = () => setBasicModal(!basicModal);
	const [formValue, setFormValue] = useState({
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState({});
	const onChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};
	const submitHandler = () => {
		let errors = {};
		if (formValue.email) {
			const validEmail = new RegExp(
				`^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`
			);
			if (!validEmail.test(formValue.email)) {
				errors['email'] = 'Incorrect email';
			}
		}
		if (!formValue.email) {
			errors['email'] = 'Email is required';
		}
		if (!formValue.message) {
			errors['message'] = 'Message is required';
		}

		if (Object.keys(errors).length <= 0) {
			// navigate('/home');
			toggleShow();
		} else {
			setErrors(errors);
		}
	};

	return (
		<>
			<MDBRow>
				<MDBCol md={3}></MDBCol>
				<MDBCol md={4} className='avd-main-div'>
					<div className='adv-title center'>Advertisement</div>
					<p className='adv-subtitle center'>
						Our Friendly team would love to hear from you
					</p>
					<label className='advertise-label'>
						Email <span className='primary-color'>*</span>
					</label>
					<MDBInput
						className=' input-filed'
						name='email'
						onChange={onChange}
						value={formValue.email}
						id='validationCustom01'
						type='email'
						required
						label='Email *'
					/>
					{errors.email && <p className='errorTextAdv'>{errors.email}</p>}
					<br />
					<p className='advertise-label'>
						Message
						<span className='primary-color'>*</span>
					</p>
					<MDBTextArea
						name='message'
						label='Message *'
						onChange={onChange}
						id='textAreaadv'
						rows={4}
					/>
					{errors.message && <p className='errorTextAdv '>{errors.message}</p>}
					<br />
					<MDBRow>
						<MDBCol md={3}></MDBCol>
						<MDBCol md={6}>
							<MDBBtn
								type='button'
								className='adv-btn'
								onClick={submitHandler}
								block
							>
								Send Message
							</MDBBtn>
						</MDBCol>
					</MDBRow>
				</MDBCol>
				<MDBCol md={3}></MDBCol>
			</MDBRow>

			{/* Model */}
			<MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
				<MDBModalDialog className='send-model'>
					<MDBModalContent>
						<span className='close-button'>
							<MDBBtn
								className='btn-close model-close-btn'
								color='none'
								onClick={toggleShow}
							></MDBBtn>
						</span>

						<MDBModalBody
							style={{
								padding: '10%',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
						>
							<img src={sendIcon} style={{}} />
							<br />
							<h3 className='email-send-popup-text'>SENT</h3>
						</MDBModalBody>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
