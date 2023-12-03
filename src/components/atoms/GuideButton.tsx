import { startGuide } from "@/redux/features/guide";
import { FloatButton } from "antd";
import { RiRobot2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const GuideButton = () => {
	const dispatch = useDispatch();
	return (
		<FloatButton
			shape='square'
			type='primary'
			style={{ right: 24 }}
			onClick={() => dispatch(startGuide())}
			icon={<RiRobot2Fill />}
		/>
	);
};

export default GuideButton;
