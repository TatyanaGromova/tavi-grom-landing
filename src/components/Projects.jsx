import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useMotionSettings } from '../utils/motion'

export default function Projects() {
  const { stagger } = useMotionSettings()

  return (
    <section id="projects" className="section-padding bg-graphite-light/30">
      <div className="container-wide">
        <SectionTitle
          title="Проекты"
          subtitle="Каждый проект — это путь от идеи до готового визуального или цифрового решения."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: stagger }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              image={project.image}
              imageAlt={project.imageAlt}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
