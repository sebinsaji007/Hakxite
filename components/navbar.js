import React from "react";
import styles from "../styles/Home.module.scss";
import Head from "next/dist/shared/lib/head";
import Link from "next/dist/client/link";
const Navbar = () => {
  return (
    <div>
      <Head>
        <title>Fitculture</title>
        <meta
          name="description"
          content="Created for Enhancing Gym Performance"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.left}>
          <Link href="/">
            <a className={styles.logo}>Fitculture</a>
          </Link>
        </div>
        

        <div className={styles.right}>
        <Link href="/displayExercise" passHref>
            <a className={styles.cta}>Find exercises</a>
          </Link>
          <Link href="/GenerativeAIComponent" passHref>
            <a className={styles.cta}>create a custom diet plan</a>
          </Link>

          <Link href="/nutrition" passHref>
            <a className={styles.cta}>Track macros and calories</a>
          </Link>

        </div>

      </header>
    </div>
  );
};

export default Navbar;
