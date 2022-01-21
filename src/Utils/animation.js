import { Suspense, lazy } from "react";
import Spinner2 from "./Spinner2";
// import lazy from "react-lazy-named";

const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.motion.div,
  }))
);

const MotionImg = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.motion.img,
  }))
);

const MotionP = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.motion.p,
  }))
);
// const MotionA = lazy(() => import("framer-motion"), "motion.a");
// const MotionUl = lazy(() => import("framer-motion"), "motion.ul");
// const MotionLi = lazy(() => import("framer-motion"), "motion.li");

export const AnimationDiv = (props) => (
  <Suspense fallback={<Spinner2 className={props.classes} />}>
    <MotionDiv {...props}>{props.children}</MotionDiv>
  </Suspense>
);

export const AnimationImg = (props) => (
  <Suspense fallback={<div className={props.classes}>Loading..</div>}>
    <MotionImg {...props} />
  </Suspense>
);

export const AnimationP = (props) => (
  <Suspense
    fallback={
      <>
        <p className={props.classes} />
        <p className={props.classes} />
        <p className={props.classes} />
      </>
    }
  >
    <MotionP {...props}>{props.children}</MotionP>
  </Suspense>
);

// export const AnimationA = (props) => {
//   <Suspense fallback={<a className={props.className} href={props.fref}></a>}>
//     <MotionA>{props.children}</MotionA>
//   </Suspense>;
// };

// export const AnimationUl = (props) => {
//   <Suspense fallback={<ul className={props.className}></ul>}>
//     <MotionUl {...props} />
//   </Suspense>;
// };

// export const AnimationLi = (props) => {
//   <Suspense fallback={<li className={props.className}></li>}>
//     <MotionLi {...props} />
//   </Suspense>;
// };
