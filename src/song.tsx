export type SongProps = {
  image: string;
  name: string;
}
export default function card(props: SongProps) {
  return (
    <div className="song">
      <div>
        <img className="song-image" src={props.image} alt="song-img" />
      </div>
      <div className="song-name">
        {props.name}
      </div>
    </div>
  );
}