
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <Link style={{ color: 'white' }} shallow={true} href="/">Eleonora Blog</Link>
    </nav>
  );
}

export default Navbar;
