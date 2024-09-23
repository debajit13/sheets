import { FiFile } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SheetCard: React.FC<{
  fileName: string;
  href: string;
}> = ({ fileName, href }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(href);
      }}
      className='cursor-pointer file-card flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'
    >
      <FiFile className='w-16 h-16 text-[#bcbcbc] mb-3' />
      <span className='text-center text-sm text-[#292929] truncate w-full'>
        {fileName}
      </span>
    </div>
  );
};
export default SheetCard;
