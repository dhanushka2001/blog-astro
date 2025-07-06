import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Dhanushka</GradientText> 👋
        </>
      }
      description={
        <>
          {/*
          I am a software developer who blogs and deploys tools for investing.
          You can find some of my free tools at{' '}
          <a
            className="text-cyan-400 hover:underline"
            href="https://github.com/dli-invest"
          >
            dli-invest
          </a>{' '}
          .
	  */}
          Bio in progress...
        </>
      }
      avatar={
        <img
          className="h-80 w-80 rounded-full"
          src="/assets/images/avatar.png"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://www.linkedin.com/in/david-li-b1671a10b/">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          <a href="https://github.com/FriendlyUser">
            <HeroSocial src="/assets/images/github.png" alt="Github icon" />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
