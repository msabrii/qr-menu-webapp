import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { motion } from 'framer-motion';

const Spinner = () => {
	return <motion.div className="w-12 h-12 rounded-full border-white border-4 border-t-red-600" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}></motion.div>;
};

const LoadingScreen = () => {
	const { loading } = useContext(FirebaseAuthContext);
	return (
		<>
			{loading && (
				<div className="flex justify-center items-center w-screen h-screen z-50 bg-black opacity-30 absolute top-0">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default LoadingScreen;
<div className="w-screen h-screen z-50 bg-black opacity-70 absolute top-0">
	<p className="text-white">Loading...</p>
</div>;
