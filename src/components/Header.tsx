export interface HeaderProps {
  text: string;
}

export function Header({ text }: HeaderProps) {
  return <h1 className="text-center text-[3rem]">{text}</h1>;
}
