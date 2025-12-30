"use client";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
type ProjectMotionCardProps = {
  project: any;
  index: number;
  progress: MotionValue<number>;
  deck: number[][];
  grid: number[][];
  inView: boolean;
};

export default function ProjectMotionCard({
  project,
  index,
  progress,
  deck,
  grid,
  inView,
}: ProjectMotionCardProps)  {
  const SPRING = { stiffness: 140, damping: 26 };

  const x = useSpring(
    useTransform(progress, [0, 1], [deck[index][0], grid[index][0]]),
    SPRING
  );

  const y = useSpring(
    useTransform(progress, [0, 1], [deck[index][1], grid[index][1]]),
    SPRING
  );

  const scale = useSpring(
    useTransform(progress, [0, 0.3], [0.94, 1]),
    SPRING
  );

  const rotate = useSpring(
    useTransform(progress, [0, 1], [(index - 1) * 6, 0]),
    SPRING
  );

  const entryY = useSpring(inView ? 0 : 30, {
    stiffness: 120,
    damping: 20,
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        translateY: entryY,
        zIndex: 10 - Math.abs(index - 1),
      }}
      className="absolute top-0 -translate-x-1/2"
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}
