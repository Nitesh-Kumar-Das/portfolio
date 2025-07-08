'use client';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';

const features = [
	{
		icon: Code,
		title: 'Full-Stack Development',
		description:
			'Building end-to-end web applications with modern frameworks and scalable architectures.',
		level: 95,
	},
	{
		icon: Palette,
		title: 'AI Bot Development',
		description:
			'Creating intelligent chatbots and conversational AI systems with advanced NLP capabilities.',
		level: 90,
	},
	{
		icon: Zap,
		title: 'ML Model Creation',
		description:
			'Developing and training machine learning models for various data-driven solutions.',
		level: 88,
	},
	{
		icon: Users,
		title: 'Data Handling',
		description:
			'Expert in data processing, analysis, and pipeline creation for ML model training and deployment.',
		level: 92,
	},
];

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
	}, [value, progress]);
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
					textSize: '16px',
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

export default function About() {
	return (
		<section id="about" className="py-20 bg-slate-900">
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
							About Me
						</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						I&apos;m currently in my final year of college, focused on building
						real-world projects and sharpening my development skills. My journey
						is all about hands-on learning—creating web applications, experimenting
						with AI, and building a strong portfolio through practical experience.
					</p>
				</motion.div>

				{/* Replace the Skills grid with animated circular progress bars */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ scale: 1.05 }}
							className="glass rounded-xl p-6 text-center hover:glow transition-all duration-300 flex flex-col items-center"
						>
							<AnimatedCircularProgress value={feature.level} index={index} />
							<h3 className="text-xl font-semibold text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-300">{feature.description}</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="glass rounded-2xl p-8 md:p-12"
				>
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-3xl font-bold text-white mb-6">My Journey</h3>
							<p className="text-gray-300 mb-6">
								As a final-year college student, I dedicate most of my time to
								building projects and learning by doing. My experience is shaped by
								practical development—designing, coding, and deploying applications
								that solve real problems and showcase my growth as a developer.
							</p>
							<p className="text-gray-300 mb-6">
								I believe in learning through building. Every project is an
								opportunity to explore new technologies, improve my skills, and
								create something meaningful. My portfolio is a reflection of this
								journey—driven by curiosity, creativity, and a passion for software
								development.
							</p>
							<div className="flex flex-wrap gap-4">
								{['AI Development', 'Data Science', 'Full-Stack Web Dev', 'ML Engineering'].map(
									(skill, index) => (
										<motion.span
											key={skill}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ delay: index * 0.1 }}
											viewport={{ once: true }}
											className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium"
										>
											{skill}
										</motion.span>
									)
								)}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{[
								{ number: '10+', label: 'Personal Projects' },
								{ number: '2+', label: 'Years of Learning' },
								{ number: '100%', label: 'Self-Motivated Growth' },
								{ number: '∞', label: 'Curiosity & Passion' },
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.1 }}
									viewport={{ once: true }}
									className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
								>
									<div className="text-3xl font-bold text-white mb-2">
										{stat.number}
									</div>
									<div className="text-gray-300 text-sm">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
