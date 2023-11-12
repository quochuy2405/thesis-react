/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputTag } from "@/components/atoms";
import { HeaderSearch, LoadFacesExisted, UploadFaces, UploadFiles } from "@/components/molercules";
import { PreviewImages } from "@/components/organims";
import { Button, Form, FormInstance, Segmented, Space, Spin, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SegmentedValue } from "antd/es/segmented";
import { getImageByFaces } from "@/apis/face";
import { getImageAll, getImageByTagsContains, getImageByTagsMatchAll } from "@/apis/get_image";
import React, { useEffect, useState } from "react";

import { BsTranslate } from "react-icons/bs";
import { CgImage } from "react-icons/cg";
import { FaRegFaceGrinSquint } from "react-icons/fa6";
import { HiOutlineTag } from "react-icons/hi2";
import { VscLoading } from "react-icons/vsc";

const Page = () => {
	const formRef = React.useRef<FormInstance>(null);
	const [loading, setLoading] = useState(false);
	const [searchType, setSearchType] = useState<SegmentedValue>("face");
	const [data, setData] = useState<any>([]);
	const [methods, setMethods] = useState<any>({});

	const onSubmit = async (data: any) => {
		switch (searchType) {
			case "tag": {
				if (!data?.tags?.length) return;
				setLoading(true);
				if (methods.isMatchAll) {
					Promise.allSettled([
						await getImageByTagsMatchAll(data.tags)
							.then((res) => {
								const data = res.data;
								if (data) {
									setData(data);
								}
							})
							.catch(() => {
								setData([]);
							})
							.finally(() => {
								setTimeout(() => {
									setLoading(false);
								}, 1200);
							}),
					]);
				} else {
					Promise.allSettled([
						await getImageByTagsContains(data.tags)
							.then((res) => {
								const data = res.data;
								if (data) {
									setData(data);
								}
							})
							.catch(() => {
								setData([]);
							})
							.finally(() => {
								setTimeout(() => {
									setLoading(false);
								}, 1200);
							}),
					]);
				}

				break;
			}
			case "face": {
				if (methods.faceUpload) { /* empty */ } else {
					await getImageByFaces("1")
						.then((res) => {
							const data = res.data;
							if (data) {
								setData(data);
							}
						})
						.catch(() => {
							setData([]);
						})
						.finally(() => {
							setTimeout(() => {
								setLoading(false);
							}, 1200);
						});
				}
			}
		
		}
	};
	const onChangeTags = (values: Array<string>) => {
		formRef.current?.setFieldsValue({ tags: [...values] });
	};

	const onChangeContain = (value: boolean) => {
		setMethods((curr: any) => ({ ...curr, isMatchAll: !!value }));
	};

	const onChangeFace = (value: boolean) => {
		setMethods((curr: any) => ({ ...curr, faceExisted: !!value }));
	};

	useEffect(() => {
		setData([]);
		if (searchType === "annoy") {
			setLoading(true);
			getImageAll("1")
				.then((res) => {
					const data = res.data;
					if (data) {
						setData(data);
					}
				})
				.catch(() => {
					setData([]);
				})
				.finally(() => {
					setTimeout(() => {
						setLoading(false);
					}, 1200);
				});
		}
	}, [searchType]);
	return (
		<div className='flex flex-col h-full'>
			<HeaderSearch title='Search AI' />
			<div className='flex-1 w-full h-full bg-white py-6 px-2 flex flex-col overflow-y-auto'>
				<p className='text-xs uppercase text-black/50 px-4 py-2'>MODELS</p>
				<Space direction='vertical' className='px-4'>
					<Segmented
						className='!bg-neutral-50'
						onChange={(value) => {
							setSearchType(value);
						}}
						options={[
							{
								label: (
									<div className='w-full flex items-center justify-center flex-col p-4'>
										<div className='w-full flex items-center justify-center'>
											<FaRegFaceGrinSquint size={20} />
										</div>
										<div>Face Detector</div>
									</div>
								),
								value: "face",
							},
							{
								label: (
									<div className='w-full flex items-center justify-center flex-col p-4'>
										<div className='w-full flex items-center justify-center'>
											<BsTranslate size={20} />
										</div>
										<div>Promt AI Transfomer</div>
									</div>
								),
								value: "transfomer",
							},
							{
								label: (
									<div className='w-full flex items-center justify-center flex-col p-4'>
										<div className='w-full flex items-center justify-center'>
											<CgImage size={20} />
										</div>
										<div>Annoy Vector</div>
									</div>
								),
								value: "annoy",
							},
							// {
							// 	label: (
							// 		<div className="w-full flex items-center justify-center flex-col p-4">
							// 			<div className="w-full flex items-center justify-center">
							// 				<IoFlashOutline size={20} />
							// 			</div>
							// 			<div>Elastic Search</div>
							// 		</div>
							// 	),
							// 	value: "elastic",
							// },
							{
								label: (
									<div className='w-full flex items-center justify-center flex-col p-4'>
										<div className='w-full flex items-center justify-center'>
											<HiOutlineTag size={20} />
										</div>
										<div>Tags Search</div>
									</div>
								),
								value: "tag",
							},
						]}
					/>
				</Space>
				<div className='flex items-center justify-start gap-4 p-4 h-40'>
					<Form
						ref={formRef}
						name='control-ref'
						initialValues={{ remember: true }}
						onFinish={onSubmit}
						className='flex gap-4 items-center'>
						{searchType === "tag" && (
							<div className='flex flex-col gap-2'>
								<div className='flex gap-2 items-center'>
									<h3 className='text-xs uppercase text-black/50'>Match All Tags</h3>
									<Switch
										checked={methods.isMatchAll}
										className='bg-gray-500 flex items-center'
										onChange={onChangeContain}
									/>
								</div>
								<Form.Item className='!mb-0' name='tags' label='' rules={[{ required: false }]}>
									<InputTag onChange={onChangeTags} />
								</Form.Item>
							</div>
						)}

						{searchType === "transfomer" && (
							<Form.Item className='!mb-0' name='transfomer' label='' rules={[{ required: false }]}>
								<TextArea
									className='!border-neutral-200 !w-[500px]'
									rows={5}
									placeholder='Enter promt'
								/>
							</Form.Item>
						)}
						{searchType === "face" && (
							<Form.Item className='!mb-0  py-4' name='face' label='' rules={[{ required: false }]}>
								<div className='min-w-[400px] flex flex-col gap-2'>
									<div className='flex gap-2 items-center'>
										<h3 className='text-xs uppercase text-black/50'>Faces Existed</h3>
										<Switch
											checked={methods.faceExisted}
											className='bg-gray-500 flex items-center'
											onChange={onChangeFace}
										/>
									</div>
									<div className='h-[100px]'>
										<LoadFacesExisted hidden={!methods?.faceExisted} />
										<UploadFaces hidden={!!methods?.faceExisted} />
									</div>
								</div>
							</Form.Item>
						)}

						{searchType === "annoy" && (
							<Form.Item className='!mb-0' name='face' label='' rules={[{ required: false }]}>
								<div className='w-[400px] flex items-center justify-center'>
									<UploadFiles />
								</div>
							</Form.Item>
						)}

						<Button
							loading={loading}
							htmlType='submit'
							className='button-form !font-medium mt-6 flex items-center justify-center !bg-emerald-400 !text-white border-none px-8'>
							Search
						</Button>
					</Form>
				</div>

				<p className='text-xs uppercase text-black/50 px-4'>
					Search By <span className='uppercase'>{searchType}</span>
				</p>
				{loading ? (
					<div className='flex-1 w-full flex items-center justify-center'>
						<Spin
							indicator={
								<span className='animate-spin'>
									<VscLoading />
								</span>
							}
						/>
					</div>
				) : (
					<PreviewImages isSimilar={searchType === "annoy"} data={data} />
				)}
			</div>
		</div>
	);
};

export default Page;