import GitHubIcon from "../icons/GitHubIcon";

export default function Footer() {
  return (
    <div className="flex w-full justify-center p-8 text-content-tertiary">
      <a
        href="https://github.com/DSIW/overtimer"
        rel="noreferrer"
        target="_blank"
        aria-label="GitHub repository"
        className="hover:text-accent"
      >
        <GitHubIcon />
      </a>
    </div>
  );
}
