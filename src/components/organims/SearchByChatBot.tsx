/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Avatar,
	Button,
	Checkbox,
	Col,
	Empty,
	Form,
	FormInstance,
	Row,
	UploadFile,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { BsSendSlash } from "react-icons/bs";
import { TypeWriter } from "../atoms";
import { ImagePreview, UploadFaces } from "../molercules";
import { confirmPropmt, sendPrompt } from "@/apis/prompt";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

const SearchByChatBot = () => {
	const formRef = React.useRef<FormInstance>(null);
	const [promptUser, setPromptUser] = useState<string>("");
	const [imageUserUpload, setImageUserUpload] = useState<UploadFile[]>([]);
	const [chatMessages, setChatMessages] = useState<React.ReactNode[]>([]);
	const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
	const [data, setData] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const onChange = (list: CheckboxValueType[]) => {
		setCheckedList(list);
	};

	const renderUserQuestion = (text: string) => {
		const jumto = document.getElementById("jumto");
		if (jumto) jumto.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });

		return (
			<div
				key={text}
				className='flex gap-4 flex-row-reverse pl-10 p-4 bg-white rounded-lg min-h-[100px]'>
				<Avatar
					src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
					className='object-cover'
				/>
				<pre className=' w-full h-fit p-2 text-end '>{text}</pre>
			</div>
		);
	};

	const renderImages = (images: any) => {
		return (
			<Row gutter={{ xs: 8, sm: 10, md: 10, lg: 10 }} wrap>
				{!images.length && (
					<div className='h-full w-full flex items-center justify-center'>
						<Empty />
					</div>
				)}
				{images?.map((item: any) => (
					<Col className='gutter-row min-w-[270px] m-auto' span={6} key={JSON.stringify(item)}>
						<ImagePreview data={item} onClick={() => 1} onClose={() => 1} />
					</Col>
				))}
			</Row>
		);
	};

	const confirm = async () => {
		setLoading(true);
		const form = {
			api: data.api,
			params: checkedList,
			querySimilarImage: data.querySimilarImage,
			queryFaceDetection: data.queryFaceDetection,
		};
		await confirmPropmt(imageUserUpload[0], form)
			.then(({ data }) => {
				const images = renderImages(data);
				setChatMessages((prevMessages) => [...prevMessages, images]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderUpload = (options: any) => {
		const jumto = document.getElementById("jumto");
		if (jumto) jumto.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });

		return (
			<div className='bg-white w-full h-fit text-end rounded-lg flex p-4 gap-4'>
				<Avatar
					src='https://d2cbg94ubxgsnp.cloudfront.net/Pictures/2000xAny/9/9/2/512992_shutterstock_715962319converted_749269.png'
					className='object-cover'
				/>
				<div className='h-fit flex flex-col justify-start'>
					<p> Let's upload image.</p>
					<UploadFaces
						fileList={imageUserUpload}
						onChange={(file) => {
							setImageUserUpload(file);
						}}
						size={1}
						hidden={false}
					/>
					<div className='flex flex-col gap-3'>
						Hi! From this required I think probaly objects are such as:
						<CheckboxGroup options={options} value={checkedList} onChange={onChange} />
						<Button
							loading={loading}
							onClick={confirm}
							className='font-normal w-fit items-center flex justify-center text-xs !rounded-lg'>
							{!loading && "Confirm"}
							{loading && "Processing..."}
						</Button>
					</div>
				</div>
			</div>
		);
	};

	const renderBotResponse = (botResponse: string) => {
		const jumto = document.getElementById("jumto");
		if (jumto) jumto.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });

		return (
			<div
				key={botResponse}
				className='flex gap-4 flex-row pr-10 p-4 bg-white rounded-lg min-h-[100px]'>
				<Avatar
					src='https://d2cbg94ubxgsnp.cloudfront.net/Pictures/2000xAny/9/9/2/512992_shutterstock_715962319converted_749269.png'
					className='object-cover'
				/>
				<TypeWriter text={botResponse} delay={30} />
			</div>
		);
	};
	function* generateChat(request: string) {
		const userQuestion = renderUserQuestion(request);
		setChatMessages((prevMessages) => [...prevMessages, userQuestion]);
		yield 1;
		const text =
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia accusamus natus animi est provident eius quibusdam quaerat fugiat vitae minima fugit quas sequi, eveniet quidem iure corporis totam. At, ad.";
		const botResponse = renderBotResponse(text);
		setChatMessages((prevMessages) => [...prevMessages, botResponse]);

		yield 2;

		const botResponseUpload = "bot-upload";
		setChatMessages((prevMessages) => [...prevMessages, botResponseUpload]);
		yield 3;
	}

	const onSubmit = async (data: { request: string }) => {
		setLoading(true);
		if (!data.request) {
			message.warning("Please enter prompt!");
			setLoading(false);
			return;
		}

		await sendPrompt(data.request)
			.then(({ data }) => {
				setData(data);
			})
			.finally(() => {
				setLoading(false);
			});
		const gen = generateChat(data.request);
		gen.next();
		const text =
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia accusamus natus animi est.";
		gen.next();

		setTimeout(() => {
			gen.next();
		}, text.split("").length * 55);
	};

	return (
		<div className='flex-1 flex flex-col w-full relative py-4'>
			<div className='h-[55vh] w-full bg-gray-500/5 rounded-md p-4 gap-4 flex flex-col overflow-y-auto border'>
				{chatMessages.map((message, index) => {
					if (message === "bot-upload") return renderUpload(data?.params);
					return <React.Fragment key={index}>{message}</React.Fragment>;
				})}
				<div id='jumto'></div>
			</div>

			<div className='absolute bottom-2 w-full px-4 h-fit'>
				<Form
					ref={formRef}
					name='chat-ref'
					className='!w-full flex items-center justify-between gap-4'
					initialValues={{ remember: true }}
					onFinish={(data) => onSubmit(data)}>
					<Form.Item
						className='!mb-0 !w-full'
						name='request'
						label=''
						rules={[{ required: false }]}>
						<TextArea
							value={promptUser}
							onChange={(e) => setPromptUser(e.target.value)}
							className='!border-neutral-200 whitespace-pre-line !p-3'
							autoSize
							placeholder='Enter prompt'
						/>
					</Form.Item>
					<Button htmlType='submit' loading={loading} icon={<BsSendSlash />} />
				</Form>
			</div>
		</div>
	);
};

export default SearchByChatBot;
