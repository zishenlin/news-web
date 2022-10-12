import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from '@pages/PageLayout/PageLayout';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PageLayout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
