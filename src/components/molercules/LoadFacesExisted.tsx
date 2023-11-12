import { Avatar } from 'antd';
import clsx from 'clsx';
import React from 'react'

interface LoadFacesExistedProps {
	hidden:boolean
}

const LoadFacesExisted: React.FC<LoadFacesExistedProps> = ({hidden}) => {
    return (
        <div className={clsx("flex items-center gap-4", {
        'hidden':!!hidden
        })}>
				{[1, 2, 3, 4].map((item) => (
					<Avatar
						key={item}
						size={100.4}
						alt=''
						src='https://assets.vogue.in/photos/640592409d03d0d41504f3a0/1:1/w_1600,h_1600,c_limit/Face%20taping%20.jpg'
					/>
				))}
			</div>
		);
};

export default LoadFacesExisted