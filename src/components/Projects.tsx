'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useState } from 'react';

const projects = [
	{
		id: 1,
		title: 'AI_studY_bot',
		description: 'An AI-powered study assistant bot for students.',
		image: '/pics/study-bot.png',
		technologies: ['Python', 'AI', 'NLP'],
		github: 'https://github.com/Nitesh-Kumar-Das/AI_studY_bot',
		live: '#',
		category: 'AI'
	},
	{
		id: 2,
		title: 'TIC-TAC-TOE',
		description: 'A classic Tic-Tac-Toe game implementation.',
		image: '/pics/tictactoe.png',
		technologies: ['JavaScript', 'Web'],
		github: 'https://github.com/Nitesh-Kumar-Das/TIC-TAC-TOE',
		live: '#',
		category: 'Game'
	},
	{
		id: 3,
		title: 'AI_money_management',
		description: 'AI-based money management and budgeting tool.',
		image: '/pics/money-bot.png',
		technologies: ['Python', 'AI', 'Finance'],
		github: 'https://github.com/Nitesh-Kumar-Das/AI_money_management',
		live: '#',
		category: 'AI'
	},
	{
		id: 4,
		title: 'web-chat',
		description: 'A real-time web chat application.',
		image: '/pics/webchat.png',
		technologies: ['JavaScript', 'WebSocket', 'Node.js'],
		github: 'https://github.com/Nitesh-Kumar-Das/web-chat',
		live: '#',
		category: 'Web'
	},
	{
		id: 6,
		title: 'agrosync',
		description: 'A platform for agricultural data synchronization.',
		image: '/api/placeholder/600/400',
		technologies: ['Python', 'Web'],
		github: 'https://github.com/Nitesh-Kumar-Das/agrosync',
		live: '#',
		category: 'Web'
	}
];

const categories = ['All', 'AI', 'Game', 'Web'];

export default function Projects() {
	const [activeCategory, setActiveCategory] = useState('All');
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);

	const filteredProjects =
		activeCategory === 'All'
			? projects
			: projects.filter((project) => project.category === activeCategory);

	return (
		<section id="projects" className="py-20 bg-slate-900">
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
							Featured Projects
						</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						A showcase of AI-powered applications, full-stack web solutions, and
						data-driven projects that demonstrate expertise in modern development
						and machine learning.
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					{categories.map((category) => (
						<motion.button
							key={category}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setActiveCategory(category)}
							className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
								activeCategory === category
									? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
									: 'glass text-gray-300 hover:text-white'
							}`}
						>
							{category}
						</motion.button>
					))}
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					layout
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{filteredProjects.map((project, index) => (
						<motion.div
							key={project.id}
							layout
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -10 }}
							onHoverStart={() => setHoveredProject(project.id)}
							onHoverEnd={() => setHoveredProject(null)}
							className="glass rounded-xl overflow-hidden group cursor-pointer"
						>
							{/* Project Image */}
							<div className="relative h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									className="absolute inset-0 w-full h-full object-cover z-0"
									style={{ objectFit: 'cover', opacity: 0.85 }}
								/>
								<motion.div
									animate={{
										scale: hoveredProject === project.id ? 1.1 : 1
									}}
									transition={{ duration: 0.3 }}
									className="w-full h-full flex items-center justify-center z-20"
								>
									<div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center">
										<Eye className="text-white" size={32} />
									</div>
								</motion.div>

								{/* Overlay */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
									className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
								>
									<motion.a
										href={project.github}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
									>
										<Github className="text-white" size={20} />
									</motion.a>
									<motion.a
										href={project.live}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
									>
										<ExternalLink className="text-white" size={20} />
									</motion.a>
								</motion.div>
							</div>

							{/* Project Content */}
							<div className="p-6">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-xl font-bold text-white">
										{project.title}
									</h3>
									<span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
										{project.category}
									</span>
								</div>

								<p className="text-gray-300 mb-4 line-clamp-3">
									{project.description}
								</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
										>
											{tech}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex gap-4">
									<motion.a
										href={project.github}
										whileHover={{ scale: 1.05 }}
										className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
									>
										<Github size={16} />
										<span className="text-sm">Code</span>
									</motion.a>
									<motion.a
										href={project.live}
										whileHover={{ scale: 1.05 }}
										className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
									>
										<ExternalLink size={16} />
										<span className="text-sm">Live Demo</span>
									</motion.a>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<p className="text-gray-300 mb-6">Want to see more of my work?</p>
					<motion.a
						href="#"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
					>
						<Github size={20} />
						View All Projects
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
