interface InfoPillProps {
  text: string;
  image: string;
}

function InfoPill({text, image}: InfoPillProps) {
  return (
  <figure className="flex items-center gap-1.5">
  <img src={image} alt="calendar" className="h-5 w-5"/>
  <figcaption className='text-sm md:text-lg font-normal truncate text-gray-100'>
    {text}
  </figcaption>
  </figure>   
  )
}

export default InfoPill