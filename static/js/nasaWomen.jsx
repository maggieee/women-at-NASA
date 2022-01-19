function getData() {
  return fetch('https://images-api.nasa.gov/search?q=women&media_type=image')
    .then(response => response.json())
    .then(res => {
      const nasaImageData = [];

      for (const data of res.collection['items'].slice(1)) {
          nasaImageData.push(data);
        }
    
      console.log(nasaImageData[0], nasaImageData[1].links[0].href);

      return nasaImageData;
    })
}

function App() {
  const [data, setData] = React.useState([]); 
  const [year, setYear] = React.useState("All years");
  
  React.useEffect(() => {
    let mounted = true;
    getData()
      .then(items => {
        if(mounted) {
          setData(items)
        }
      })
    return () => mounted = false;
  }, [])
    
    return (
      <React.Fragment>
        <YearContainer nasaImageData={data} year={year} setYear={setYear} />
        <NasaImageContainer nasaImageData={data} year={year}/>
      </React.Fragment>
    );
}

function YearButton(props) {
  const {setYear, year} = props;
  return (
      <button type="button" className="btn btn-light" value={year} onClick={() => setYear(year)}>
                  {year}
      </button>
  );
}

function YearContainer(props) {
  const {nasaImageData, setYear} = props;
  const years = [];
  const yearButtons = [<YearButton year={'All years'} key={0} setYear={setYear}/>];

  for (const currentImage of nasaImageData) {
      if (years.includes(currentImage.data[0].date_created.slice(0,4)) == false) {
          years.push(currentImage.data[0].date_created.slice(0,4));
      }
  }

  years.sort();

  for (let year of years) {
      yearButtons.push (
          <YearButton
              year={year}
              key={year}
              setYear={setYear}
          />
      );
  }
  
  return <React.Fragment><div className="row">
  <div className="col">{yearButtons}</div></div></React.Fragment>;
}

function NasaImage(props) {

    const [likeValue, setLikeValue] = React.useState(false);

    let liked = "Not yet liked";

    if (likeValue === true) {
      liked = "Liked!";
    }

  return (
      <div className="row">
        <div className="col">
          <div className="image-container">
              <div className="image">
              <a href={'https://images.nasa.gov/details-' + props.nasa_id} target="_blank"><img src={props.url} alt="Image of NASA women" /></a>
              </div>
              <h2>{props.title}</h2>
              <p>{props.description}</p>
              <i>Date image created: {props.date_created}</i><br></br><br></br>
              <button type="button" className="btn btn-light" onClick={() => setLikeValue(!likeValue)}>
                  {liked}
              </button>
          </div>
        </div>
      </div>
  //   </div>
  );
}

function NasaImageContainer(props) {
  const {nasaImageData, year} = props;
  const nasaImages = [];

  for (const currentImage of nasaImageData) {
      if (year != "All years") {
          if (currentImage.data[0].date_created.slice(0,4) === year) {
              nasaImages.push(
              <NasaImage
                  title={currentImage.data[0].title}
                  description={currentImage.data[0].description}
                  url={currentImage.links[0].href}
                  date_created={currentImage.data[0].date_created.slice(0,10)}
                  nasa_id={currentImage.data[0].nasa_id}
                  key={currentImage.data[0].nasa_id}
              />
              );
          }
      }
      else {
          nasaImages.push(
              <NasaImage
                  title={currentImage.data[0].title}
                  description={currentImage.data[0].description}
                  url={currentImage.links[0].href}
                  date_created={currentImage.data[0].date_created.slice(0,10)}
                  nasa_id={currentImage.data[0].nasa_id}
                  key={currentImage.data[0].nasa_id}
              />
              );
      }
  }

  return <React.Fragment>{nasaImages}</React.Fragment>;
}

ReactDOM.render(<App/>, document.querySelector('#app'));
    
