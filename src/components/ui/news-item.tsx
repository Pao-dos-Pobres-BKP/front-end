type NewsItemProps = {
  imageUrl?: string;
  title: string;
  link: string;
};

export default function NewsItem({ imageUrl, title, link }: NewsItemProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-48 h-60 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="h-36 w-full">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center"></div>
          )}
        </div>

        <div className="h-24 w-full flex items-center justify-center p-3">
          <h3 className="text-sm font-semibold text-center text-gray-800">{title}</h3>
        </div>
      </div>
    </a>
  );
}
