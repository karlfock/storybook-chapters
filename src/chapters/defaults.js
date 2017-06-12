import React from 'react';
import PropTypes from 'prop-types';
import { linkTo } from '@storybook/addon-links';
import { chapterSelect } from './navigate';
import { breadcrumbs } from './utils';

export const BADGES = {
  up: '⤴️',
  toc: 'ℹ️',
  bookmarks: '🔖',
  tags: ':hash:',
}

const styles = {
    toc: {
        fontFamily: 'sans-serif',
    },
    chapList: {
        listStyleType: 'circle',
    },
    chapSection: {
        backgroundColor: '#f7f7f7',
        fontSize: 14,
    },
    chapLink: {
        textDecoration: 'none',
        color: 'black',
    },
    chapItems: {
        padding: 6,
    },
    storySection: {
        paddingLeft: 16,
        fontSize: 12,
    },
    storyLink: {
        textDecoration: 'none',
        color: 'black',
    },
    storyItems: {
        padding: 4,
    },
    crumbs: {
        fontSize: 12,
    },
};

export function Breadcrumbs({ path, currentStory }) {
    const steps = path.map(chapter => (
      <span style={styles.crumbs} key={chapter.name} >
        {' '}
        <a
          href={`#${chapter.name}`}
          onClick={chapterSelect(chapter, currentStory)}
        >
          {chapter.name}
        </a>
        {' /'}
      </span>
    ));
    return <div>{steps}</div>;
}
Breadcrumbs.propTypes = {
    path: PropTypes.arrayOf(PropTypes.object),
    currentStory: PropTypes.string,
};

export function chapterTOC(chapter) {
    return () => {
        const subchapters = chapter.subchapters.map((val) => {
            return (
              <li style={styles.chapItems} key={val.name}>
                <a
                  href={`#${val.name}`}
                  style={styles.chapLink}
                  onClick={linkTo(chapter.name, `[${val.name}]`)}
                >
                  {val.name}
                </a>
              </li>
            );
        });
        const stories = chapter.stories.map((val) => {
            return (
              <li style={styles.storyItems} key={val.storyName}>
                <a
                  href={`#${val.storyName}`}
                  style={styles.chapLink}
                  onClick={linkTo(chapter.name, `${val.storyName}`)}
                >
                  {val.storyName}
                </a>
              </li>
            );
        });

        return (
          <div style={styles.toc}>
            <Breadcrumbs path={breadcrumbs(chapter)} currentStory={chapter.name} />
            <h3>{chapter.name}</h3>
            <hr />
            {subchapters.length > 0 ? <div style={styles.chapSection}>
              <ul style={styles.chapList}>
                {subchapters}
              </ul>
            </div> : null}

            <div style={styles.storySection}>
              <ul>
                {stories}
              </ul>
            </div>

          </div>
        );
    };
}


export function bookmarkList(chapter) {
  return () => {
    const bookmarks = chapter.bookmarks.map((val) => {
            return (
              <li style={styles.storyItems} key={val.storyName}>
                <a
                  href={`#${val.storyName}`}
                  style={styles.chapLink}
                  onClick={() => console.log(val.storyName)}
                >
                  {val.storyName}
                </a>
              </li>
            );
        });
    return (
          <div style={styles.toc}>
            <Breadcrumbs path={breadcrumbs(chapter)} currentStory={chapter.name} />
            <h3>{chapter.name}</h3>
            <hr />

            <div style={styles.storySection}>
              <ul>
                {bookmarks}
              </ul>
            </div>

          </div>
        );
  }
}