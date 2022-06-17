export type MixProps = {
  image: string;
  name: string;
  desc: string;
}

export default function mix(props: MixProps) {
  return (
    <div className="mix">
      <div>
        <img className="mix-image" src={props.image} alt="mix-img"></img>
      </div>
      <div className="mix-name">
        {props.name}
        <div className="mix-author">
          {props.desc}
        </div>
      </div>
    </div>
  );
}