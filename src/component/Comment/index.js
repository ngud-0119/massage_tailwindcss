import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol,MDBBtn, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBTextArea,
    MDBModalBody,
    MDBModalFooter,
	MDBInput, } from 'mdb-react-ui-kit';
import views from '../../assets/views.svg';
import arrow from '../../assets/icons/arrow.svg';
import commentIcon from '../../assets/icons/comment.svg';
// import './component/Styles/App.scss';
import Comment from './Comment';
import AddComment from './AddComment';
import ReplyContainer from './ReplyContainer';
import { commentPostedTime } from '../../utils';
const CommentsSection = () => {
	const [title, setTitle] = useState('');
	const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

	const [comments, updateComments] = useState([]);
	const [deleteModalState, setDeleteModalState] = useState(false);
	const [replying, setReplying] = useState(false);
	const [time, setTime] = useState('');
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		setTitle('Most Recent Threads on Detroit Rolling pub');
	}, []);
	const getData = () => {
		console.log('in get data function');
		const data = [
			{
				id: 1,
				title: 'The Green Spa',
				description:
					'I have been a client of Health Point Spa for over one years, enjoying monthly relaxation massages. The staff is always professional. The environment is serene and relaxing. A favorite is therapist come and ask what kind of massage we need.',
				commentCount: 2345,
				threadCount: 633,
				views: 564,
				day: 1,
				date: '2022-07-15',
				time: '8:10 PM',
				replies: [],
				comment: {
					title:
						'Secure Place, Professional Staff, Maintain Privacy. All Someone need to do is to contact them. Rest all they will provide You. One word "Reliable Staff"',
					email: 'jen@gmail.com',
					date: '2022-07-15',
					time: '8:10 PM',
				},
			},
			{
				id: 2,
				title: 'Detriot Rolling Pub',
				description:
					'I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.',
				commentCount: 2345,
				threadCount: 633,
				views: 564,
				day: 1,
				date: '2022-07-15',
				time: '8:10 PM',
				replies: [
					{
						id: 3,
						content:
							"@maxblaugn, If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
						createdAt: '18 December 2021',
						score: 4,
						username: 'ramsesmiron',
						currentUser: false,
						replies: [],
					},
					{
						id: 4,
						content:
							"@ramsesmiron, I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
						createdAt: '30 December 2021',
						score: 2,
						username: 'juliusomo',
						currentUser: true,
						replies: [],
					},
				],
			},
		];
		updateComments(data);
	};

	useEffect(() => {
		console.log('in 2nd use effect');
		console.log(localStorage.getItem('comments'));
		getData();
		// localStorage.getItem('comments') !== null
		// 	? updateComments(JSON.parse(localStorage.getItem('comments')))
		// 	: getData();
	}, []);

	useEffect(() => {
		localStorage.setItem('comments', JSON.stringify(comments));
		deleteModalState
			? document.body.classList.add('overflow--hidden')
			: document.body.classList.remove('overflow--hidden');
	}, [comments, deleteModalState]);

	// update score
	let updateScore = (score, id, type) => {
		let updatedComments = [...comments];

		if (type === 'comment') {
			updatedComments.forEach((data) => {
				if (data.id === id) {
					data.score = score;
				}
			});
		} else if (type === 'reply') {
			updatedComments.forEach((comment) => {
				comment.replies.forEach((data) => {
					if (data.id === id) {
						data.score = score;
					}
				});
			});
		}
		updateComments(updatedComments);
	};

	// add comments
	let addComments = (newComment) => {
		let updatedComments = [...comments, newComment];
		updateComments(updatedComments);
	};

	// add replies
	let updateReplies = (replies, id) => {
		let updatedComments = [...comments];
		updatedComments.forEach((data) => {
			if (data.id === id) {
				data.replies = [...replies];
			}
		});
		updateComments(updatedComments);
	};

	// edit comment
	let editComment = (content, id, type) => {
		let updatedComments = [...comments];

		if (type === 'comment') {
			updatedComments.forEach((data) => {
				if (data.id === id) {
					data.content = content;
				}
			});
		} else if (type === 'reply') {
			updatedComments.forEach((comment) => {
				comment.replies.forEach((data) => {
					if (data.id === id) {
						data.content = content;
					}
				});
			});
		}

		updateComments(updatedComments);
	};

	// delete comment
	let commentDelete = (id, type, parentComment) => {
		let updatedComments = [...comments];
		let updatedReplies = [];

		if (type === 'comment') {
			updatedComments = updatedComments.filter((data) => data.id !== id);
		} else if (type === 'reply') {
			comments.forEach((comment) => {
				if (comment.id === parentComment) {
					updatedReplies = comment.replies.filter((data) => data.id !== id);
					comment.replies = updatedReplies;
				}
			});
		}

		updateComments(updatedComments);
	};
	const addReply = (newReply) => {
		const replies = [...comments.replies, newReply];
		updateReplies(replies, comments.id);
		setReplying(false);
	};
	const deleteComment = (id, type) => {
		const finalType = type !== undefined ? type : 'comment';
		const finalId = id !== undefined ? id : comments.id;
		commentDelete(finalId, finalType, comments.id);
		setDeleting(false);
	};
	return (
		<>
			<br />
			<MDBRow
				style={{
					padding: '0px 60px',
				}}
			>
				<MDBCol md={12}>
					<MDBRow
						style={{
							borderRadius: '30px',
							// padding: '0 10% 10% 10%',
							background: '#FFFFFF',
							boxShadow: '2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)',
						}}
					>
						<MDBCol md={12}>
							<MDBRow className='panelHeading'>
							<MDBCol md={12}>{title}
                                    <MDBBtn outline color='light' onClick={toggleShow} className='dis-review-button'>
                                    Create Post
                                     </MDBBtn>
                                    </MDBCol>
							</MDBRow>
							{console.log(comments)}
							{comments.map((currentValue) => (
								<>
									<MDBRow style={{ padding: '1.5% 1%' }}>
										<MDBRow style={{ paddingTop: '1%' }}>
											<MDBCol md={6} style={{ display: 'flex' }}>
												<span className='comment-heading'>
													{currentValue.title}
												</span>{' '}
												&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
												<span>{currentValue.date}</span> &nbsp;&nbsp;&nbsp;
												<span>{currentValue.time}</span>&nbsp;&nbsp;&nbsp;
												<span className='viewsCount-comment'>
													<img src={views} alt='eye icon' />
													&nbsp;
													{currentValue.views} views
												</span>
											</MDBCol>
											{/* <MDBCol sm={2} className='daysCount'>
												{currentValue.day} day ago
											</MDBCol> */}
										</MDBRow>
										<MDBRow>
											<MDBCol md={8}>
												<p>{currentValue.description}</p>
											</MDBCol>
											<MDBCol md={2} className='right plr-0 '>
												<p>
													<b className='threadCount'>
														{currentValue.threadCount} Thread &nbsp;&nbsp;&nbsp;
													</b>
													<img src={arrow} alt='arrow icon' />{' '}
												</p>
											</MDBCol>
											<MDBCol md={2} className='right plr-0 '>
												<p>
													<b className='commentCount'>
														{currentValue.commentCount} Comments{' '}
													</b>
												</p>
											</MDBCol>
										</MDBRow>
										<MDBRow>
											<MDBCol md={6}>
												<span> {currentValue.day} days ago</span>{' '}
												&nbsp;&nbsp;&nbsp;
												<img src={commentIcon} alt='comment icon' />
											</MDBCol>
										</MDBRow>
										{/* <MDBRow>
											{currentValue.replies !== [] && (
												<ReplyContainer
													key={currentValue.replies.id}
													commentData={currentValue.replies}
													updateScore={updateScore}
													commentPostedTime={commentPostedTime}
													addReply={addReply}
													editComment={editComment}
													deleteComment={deleteComment}
													setDeleteModalState={setDeleteModalState}
												/>
											)}
										</MDBRow> */}
									</MDBRow>
									<hr />
								</>
							))}
						</MDBCol>
					</MDBRow>
				</MDBCol>
			</MDBRow>
			<br />
			 {/* Model */}
             <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog>

        <MDBModalContent style={{width:'650px'}}>
              <span className='close-button'>
            <MDBBtn className='btn-close model-close-btn' color='none' onClick={toggleShow}></MDBBtn>
            </span>
    
          <MDBModalBody style={{padding:''}}>
    
            <h2 className='model-heading mb-6'>Detroit Rolling Pub</h2>
         <MDBRow>
			<MDBCol md={3}><h5>Title <span style={{color:'red'}}>*</span></h5></MDBCol>
			<MDBCol md={9}> <MDBInput
		 type='text'
		 name='title-text'
		 label='Write a descriptive title'
		 id='model-area'
		 required
		className='mb-3'
		 /></MDBCol>
			<MDBCol md={3}><h5>Description<span style={{color:'red'}}>*</span></h5></MDBCol>
			<MDBCol md={9}>
  <MDBTextArea label=' Write a Description' id='model-area' required rows={6} />
				
				 </MDBCol>
		 </MDBRow>
		


          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn  onClick={toggleShow}>
            Cancel
            </MDBBtn>
            <MDBBtn>Post</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
		</>
	);
};
export default CommentsSection;
