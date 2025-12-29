// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { ArrowUpRight } from "lucide-react";

// export default function CertificationCard({ cert, index }: any) {
//   const ref = useRef(null);
//   const inView = useInView(ref, {
//     margin: "-120px",
//   });

//   return (
//     <motion.div
//       ref={ref}
//         initial={{ opacity: 0, y: 40 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{
//     duration: 0.5,
//     delay: index * 0.08,
//     ease: [0.22, 1, 0.36, 1],
//   }}
//       className="
//         glass-card
//         w-[90%]
//         mx-auto
//         px-6 py-4
//         rounded-2xl
//         grid
//         grid-cols-[auto_1fr_auto]
//         gap-x-5 gap-y-3
//         items-start
//       "
//     >
//       {/* Image (spans two rows) */}
//       <img
//         src={cert.image}
//         alt={cert.title}
//         className="
//           row-span-2
//           w-12 h-12
//           object-contain
//           rounded-md
//           shrink-0
//         "
//       />

//       {/* Title + Provider */}
//       <div className="min-w-0">
//         <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//           <h3 className="text-white text-base font-semibold leading-tight truncate mr-3">
//             {cert.title}
//           </h3>

//           <span className="text-white/90 text-sl truncate mr-3 ">
//             {cert.provider}
//           </span>

//           <span className="text-white/50 text-sm truncate">
//             {cert.timestamp}
//           </span>
//         </div>
//       </div>

//       {/* Action */}
//       <a
//         href={cert.link}
//         target="_blank"
//         rel="noreferrer"
//         className="
//           flex items-center gap-1
//           text-sm text-white/70
//           hover:text-white
//           transition
//           justify-self-end
//           self-center
//         "
//       >
//         View
//         <ArrowUpRight size={14} />
//       </a>

//       {/* Description */}
//       <p className="col-span-2 text-white/75 text-sm leading-relaxed">
//         {cert.description}
//       </p>

//       {/* Skills */}
//       <div className="col-span-3 flex flex-wrap gap-2">
//         {cert.skills.map((skill: string) => (
//           <span
//             key={skill}
//             className="
//               px-3 py-1
//               rounded-full
//               text-xs
//               bg-white/10
//               text-white/80
//             "
//           >
//             {skill}
//           </span>
//         ))}
//       </div>
//     </motion.div>
//   );
// }"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CertificationCard({
  cert,
  index,
  animateIn,
  isCollapsing,
}: {
  cert: any;
  index: number;
  animateIn: boolean;
  isCollapsing: boolean;
}) {
  return (
    <motion.div
      initial={
        animateIn
          ? { opacity: 0, y: 40 }
          : false
      }
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: isCollapsing ? 40 : -20, // 🔥 collapse downward
      }}
      transition={{
        duration: 0.45,
        delay: animateIn ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-card w-[90%] mx-auto px-6 py-4 rounded-2xl grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-3 items-start"
    >
      <img
        src={cert.image}
        alt={cert.title}
        className="row-span-2 w-12 h-12 object-contain rounded-md"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-white text-base font-semibold truncate">
            {cert.title}
          </h3>
          <span className="text-white/90 text-sm truncate">
            {cert.provider}
          </span>
          <span className="text-white/50 text-sm truncate">
            {cert.timestamp}
          </span>
        </div>
      </div>

      <a
        href={cert.link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition"
      >
        View <ArrowUpRight size={14} />
      </a>

      <p className="col-span-2 text-white/75 text-sm leading-relaxed">
        {cert.description}
      </p>

      <div className="col-span-3 flex flex-wrap gap-2">
        {cert.skills.map((skill: string) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
