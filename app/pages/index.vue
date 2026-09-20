<script setup lang="ts">
const description
  = 'Personal website and portfolio of Bart Delrue. Lecturer at Odisee University of Applied Sciences, '
    + 'full stack developer and accessibility expert.'

useSeo({
  title: 'Bart Delrue',
  description,
  path: '/',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': 'https://ctrlaltdelrue.be/',
        'about': description,
        'award': 'Apps for Ghent',
      }),
    },
  ],
})

const navLinks = [
  { href: '#personal', label: 'About me' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog', away: true },
]
</script>

<template>
  <div>
    <SiteHeader
      tagline="Development &amp; Accessibility"
      quote="&quot;Never do anything by halves if you want to get away with it. Be outrageous. Go the whole hog.&quot;"
      quote-source="Roald Dahl - Matilda"
    />

    <SiteNav :links="navLinks" />

    <div class="container-wide">
      <main id="main" class="container">
        <section id="personal" class="mb-5">
          <article class="mb-5">
            <hgroup>
              <h2>About me</h2>
              <p>Writing this, I realized I'm a pendulum.</p>
            </hgroup>

            <p>
              Back in the nineties I made my first websites using notepad at our local library.
              After first pursuing a teaching career, and consequently working in logistics for four years,
              I decided to return to my old passion for web and app development and enrolled at Howest to study
              New Media and Communication Technology.
            </p>

            <p>
              I became a full-stack developer with a high interest in accessibility and a background in
              education and history.
            </p>

            <p>
              During my four years with the city of Ghent, I had the opportunity to contribute to diverse projects
              that made a measurable and positive impact on our citizens. My proudest contributions are those to the
              city of Ghent Style Guide &mdash; forever, <em>my baby</em> &mdash; and the platform for the low
              emission zone initiative.
            </p>

            <p>
              In 2021, I traded my citizens for college students and started teaching web development at Odisee
              University of Applied Sciences.
            </p>
          </article>

          <div class="row pb-5">
            <article class="br-specialArticle">
              <hgroup>
                <h3>Education</h3>
                <p>364 ECTS credits</p>
              </hgroup>
              <ul>
                <li>
                  Bachelor multimedia and communication technology: NMCT<br>
                  180 credits - summa cum laude<br>
                  <strong>Subject bachelor thesis: web accessibility @ development</strong>
                </li>
                <li>
                  Multidisciplinary project<br>
                  Co-constructing healthy experiences &amp; smart objects, spaces&nbsp;and&nbsp;places<br>
                  3 credits
                </li>
                <li>
                  Bachelor in secondary education<br>
                  168 credits <em>(incomplete)</em><br>
                  <strong>Subject bachelor thesis: e-learning</strong>
                </li>
                <li>
                  Additional classes at UGent history dept.<br>
                  13 credits
                </li>
              </ul>
            </article>

            <article class="br-timeline br-specialArticle">
              <h3>Timeline</h3>
              <ul>
                <li class="br-timeline-first">
                  <h4>1987 - born</h4>
                  Ostend, Belgium
                </li>
                <li>
                  <h4>2005-&rsquo;09 bachelor in secondary education</h4>
                  Artevelde Hogeschool
                </li>
                <li>
                  <h4>2008-&rsquo;09 additional history courses</h4>
                  UGent
                </li>
                <li>
                  <h4>2010-&rsquo;14 logistic employee</h4>
                  DSV solutions
                </li>
                <li>
                  <h4>2014-&rsquo;17 full time student</h4>
                  New Media and Communication Technology, Howest<br>
                  graduated summa cum laude
                </li>
                <li>
                  <h4>2017-&rsquo;21 developer at Digipolis Gent</h4>
                  Accessibility and frontend development in Vue.js and Angular 2+
                </li>
                <li class="br-timeline-last">
                  <h4>2021 Lecturer at Odisee Univerity of Applied Sciences</h4>
                  Full time lecturer in web development.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section id="showcase" class="pb-3">
          <div class="row">
            <div class="col-sm-12">
              <article>
                <h2>Showcase</h2>
                <p>
                  A small selection of personal projects.<br>
                  Some are rather silly, others have a more nostalgic value, most have been abandoned.
                </p>

                <ul class="showcase">
                  <li>
                    <h3>Allietabs</h3>
                    <p>
                      This is the last remnant of my bachelor thesis <i>Accessibility @ development</i>.<br>
                      It's a fully accessible tab component which is still being used by the city of Ghent.
                    </p>
                    <p><a href="https://www.npmjs.com/package/allietabs">Available on NPM</a></p>
                  </li>
                  <li>
                    <h3>Color contrast checker</h3>
                    <p>
                      While developing the <a href="https://stijlgids.stad.gent">city of Ghent styleguide</a>,
                      I noticed most color contrast checkers only compare two colors at a time.<br>
                      This proved impractical, we have several color schemes with over a hundred variations...<br>
                      So I created a contrast checker for entire color palettes.
                    </p>
                    <p><a href="https://ctrlaltdelrue.be/contrast">Color contrast checker</a></p>

                  </li>
                  <li>
                    <h3>Put some balls in your CSS</h3>
                    <p>
                      A simple tool to help you play around with background 'balls' in CSS.<br>
                      I made it to avoid adjusting my own CSS for the nth-time while working on my internship project
                      <a href="https://mensenmaken.gent">mensenmaken.gent</a>
                    </p>
                    <p><a href="https://ctrlaltdelrue.be/balls">Put some balls in you CSS</a></p>

                  </li>
                  <li>
                    <h3>Three.js tutorial</h3>
                    <p>
                      A three.js google cardboard tutorial, created in collaboration with
                      <a href="https://www.linkedin.com/in/tijl-bulcaen/">Tijl Bulcaen</a>.
                    </p>
                    <p><a href="https://bartdelrue.github.io/tutorial">Three.js google cardboard tutorial</a></p>

                  </li>
                  <li>
                    <h3>Weunt a lief in Wachtebeke?</h3>
                    <p>
                      Originially a school project and a bit of joke, I presented this site in 2016 during
                      <i>Apps for Ghent</i>.<br>
                      I never expected it to gain so much traction!
                    </p>
                    <p>
                      It's a very simple websites which uses open data to show you which neighbourhood in Ghent has a
                      surplus of men or women in your age category.<br>
                      Hence making it more likely to find a date!
                    </p>
                    <p>
                      The site has been used to showcase open data and to promote future hackathons.<br>
                      It's one of the reasons I applied for a job at Digipolis Gent.
                    </p>
                    <p><a href="https://bartdelrue.github.io/gentselieven">Gentse lieven</a></p>
                  </li>

                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" class="pb-3">
          <article>
            <h2>Contact</h2>
            <p>
              You can find me on <a href="https://www.linkedin.com/in/bart-delrue-040672117">LinkedIn</a>,
              <a href="https://github.com/BartDelrue">Github (private)</a>,
              <a href="https://github.com/delrueba">Github (professional)</a>
              and <a href="https://codepen.io/delrue/">CodePen</a>
            </p>
            <p>
              If you'd like to reference me, feel free to use my WebId<br>
              <a href="https://id.inrupt.com/bart">https://id.inrupt.com/bart</a>
            </p>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.container-wide {
  overflow-inline: hidden;
}

.br-specialArticle {
  --lines: oklch(1 0 0 / .15);

  position: relative;

  ul {
    list-style-type: '-   ';
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: -25%;
    inline-size: 150%;
    block-size: 100%;
    border: 1px solid var(--lines);
    filter: blur(0px);
    pointer-events: none;
  }

  &::before {
    transform: rotate(10deg);
    margin-block: 40px 180px;
  }

  &::after {
    margin-block-start: 40px;
    transform: rotate(-10deg);
  }

  strong {
    margin-block-start: .5em;
    display: inline-block;
  }
}

.br-timeline {
  --color: oklch(.8477 .0931 151.82);

  h4 {
    margin-block: 0 .5em;
  }

  h3 {
    padding: 0;
    margin-block-end: .5em;
  }

  ul {
    list-style: none;
  }

  li {
    position: relative;
    padding-inline-start: 2em;
    margin-block: 0;
    padding-block-end: 3em;

    &::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: auto;
      block-size: 100%;
      border-inline-start: 2px solid var(--color);
      inline-size: auto;
      background: inherit;
    }

    &::after {
      content: '';
      inline-size: 1em;
      block-size: 1em;
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: .2em;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--color);
      transform: translateX(-50%);
    }
  }

  .br-timeline-first::before {
    inset-block-start: 1em;
    block-size: calc(100% - 1em);
  }

  .br-timeline-last {
    &::before {
      display: none;
    }

    &::after {
      background: var(--fg);
    }
  }

  .br-timeline-long {
    block-size: 2em;

    &::before {
      border-inline-start: 3px dotted var(--color);
    }

    &::after {
      inline-size: 0;
      border: none;
    }
  }
}

.showcase {
  display: grid;

  margin: 0;
  padding: 0;
  list-style: none;

  li {
    h3 {
      margin-block-start: 0;
      margin-block-end: 1em;
    }
  }

  @media (min-width: 40em) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 4rem;

    li {
      border: 1px solid oklch(1 0 0 / .2);
      padding: 1rem;

    }
  }

}
</style>