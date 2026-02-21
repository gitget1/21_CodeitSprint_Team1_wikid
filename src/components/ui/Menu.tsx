import Link from 'next/link';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface MenuProps {
  items: MenuItem[];
  onClose?: () => void;
}

function Menu({ items, onClose }: MenuProps) {
  const handleClick = (e: React.MouseEvent, itemOnClick?: () => void) => {
    e.stopPropagation();
    if (itemOnClick) {
      e.preventDefault();
      itemOnClick();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="w-30 bg-gray-50 rounded-[10px] absolute top-9.25 right-0 shadow-lg overflow-hidden z-50"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href || '#'}
          onClick={(e) => handleClick(e, item.onClick)}
          onMouseDown={(e) => e.stopPropagation()}
          className="
            py-2.5 w-full
            flex m-auto
            justify-center
            items-center
            cursor-pointer
            hover:bg-gray-100
            text-md-regular
            text-gray-500
            hover:text-primary-green-300"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default Menu;
