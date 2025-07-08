'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const skillCategories = [
	{
		name: 'Frontend & Full-Stack',
		skills: [
			{ name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
			{ name: 'Next.js', level: 90, color: 'from-gray-400 to-gray-600' },
			{ name: 'TypeScript', level: 88, color: 'from-blue-500 to-blue-700' },
			{ name: 'Node.js', level: 92, color: 'from-green-400 to-green-600' },
			{ name: 'Express.js', level: 90, color: 'from-gray-500 to-gray-700' }
		]
	},
	{
		name: 'AI & ML',
		skills: [
			{ name: 'Python', level: 95, color: 'from-yellow-400 to-yellow-600' },
			{ name: 'TensorFlow', level: 85, color: 'from-orange-400 to-orange-600' },
			{ name: 'PyTorch', level: 82, color: 'from-red-400 to-red-600' },
			{ name: 'Scikit-learn', level: 88, color: 'from-blue-400 to-blue-600' },
			{ name: 'OpenAI API', level: 90, color: 'from-green-400 to-green-600' }
		]
	},
	{
		name: 'Data & DevOps',
		skills: [
			{ name: 'Pandas', level: 92, color: 'from-purple-400 to-purple-600' },
			{ name: 'NumPy', level: 90, color: 'from-blue-400 to-blue-600' },
			{ name: 'MongoDB', level: 85, color: 'from-green-500 to-green-700' },
			{ name: 'PostgreSQL', level: 82, color: 'from-blue-400 to-blue-600' },
			{ name: 'Docker', level: 78, color: 'from-cyan-400 to-cyan-600' }
		]
	}
];

export default function Skills() {
	const [activeCategory, setActiveCategory] = useState(0);

	return (
		<section id="skills" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
			<div className="container mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
							Skills & Expertise
						</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						A comprehensive toolkit spanning full-stack web development, artificial intelligence,
						machine learning, and data processing technologies.
					</p>
				</motion.div>

				{/* Category Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="flex justify-center mb-12"
				>
					<div className="glass rounded-full p-2 flex">
						{skillCategories.map((category, index) => (
							<motion.button
								key={category.name}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveCategory(index)}
								className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
									activeCategory === index
										? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
										: 'text-gray-300 hover:text-white'
								}`}
							>
								{category.name}
							</motion.button>
						))}
					</div>
				</motion.div>

				{/* Skills Grid - Circular Progress */}
				<motion.div
					key={activeCategory}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{skillCategories[activeCategory].skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ scale: 1.05, y: -5 }}
							className="glass rounded-xl p-6 hover:glow transition-all duration-300 flex flex-col items-center"
						>
							<AnimatedCircularProgress value={skill.level} index={index} />
							<h3 className="text-xl font-semibold text-white mb-3">{skill.name}</h3>
						</motion.div>
					))}
				</motion.div>

				{/* Additional Skills Cloud */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<h3 className="text-2xl font-bold text-white mb-8">Also Experienced With</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{[
							'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Express.js', 'WebSocket',
							'NLP', 'AI', 'Finance', 'Data Sync', 'MongoDB', 'PostgreSQL', 'Docker',
							'React', 'Next.js', 'Tailwind CSS', 'Socket.io', 'API Integration', 'Git', 'RESTful APIs'
						].map((tech, index) => (
							<motion.span
								key={tech}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.05 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.1, y: -2 }}
								className="px-4 py-2 glass rounded-full text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
							>
								{tech}
							</motion.span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}

type AnimatedCircularProgressProps = {
	value: number;
	index: number;
};

const AnimatedCircularProgress = ({ value, index }: AnimatedCircularProgressProps) => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let start = 0;
		const end = value;
		if (progress === end) return;
		const timer = setInterval(() => {
			start += 1;
			setProgress(start);
			if (start === end) clearInterval(timer);
		}, 1200 / end);
		return () => clearInterval(timer);
	}, [value]);
	return (
		<div className="w-20 h-20 mx-auto mb-4">
			<CircularProgressbar
				value={progress}
				text={`${progress}%`}
				styles={buildStyles({
					pathColor: `url(#gradient${index})`,
					textColor: '#fff',
					trailColor: '#22223b',
					backgroundColor: '#22223b',
					textSize: '16px'
				})}
			/>
			<svg style={{ height: 0 }}>
				<linearGradient id={`gradient${index}`}>
					<stop offset="0%" stopColor="#6366f1" />
					<stop offset="100%" stopColor="#a21caf" />
				</linearGradient>
			</svg>
		</div>
	);
};
