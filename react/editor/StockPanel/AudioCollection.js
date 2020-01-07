import React, { useRef, useState, useEffect } from "react";
import {
  SearchBar,
  VideosContainer,
  SearchInput,
  VideosHeader,
  VideosBackContainer,
  MainContainer,
  VideoResult
} from "./styles";
import Icon from "../../_core/Icon";
import StockCard from "./StockCard";
import { VideoDetailsDialog } from "../../_core/Dialog";
import PerfectScroller from "react-perfect-scrollbar";

const AudioCollection = props => {
  const [search, setSearch] = useState("");
  const asset = [
    {
      name: "Softly Inspiring",
      url:
        "https://s3.amazonaws.com/virginia-testing.webrand.com/public/stryb_a92948.mp3"
    },
    {
      name: "Such A Great Day ",
      url:
        "https://s3.amazonaws.com/virginia-testing.webrand.com/public/SoundHelix-Song-1.mp3"
    }
  ];
  const [isModal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const keyword = props.searchBar ? props.search : search;

  return (
    <VideosContainer>
      {!props.searchBar && (
        <SearchBar>
          <Icon style={{ margin: "0 18px" }} color="#665dc3" name="search" />
          <SearchInput
            onChange={e => setSearch(e.target.value)}
            value={search}
            placeholder="Search video.."
          />
        </SearchBar>
      )}
      <VideoDetailsDialog
        data={data}
        open={isModal}
        closeModal={() => setModal(false)}
        resources={props.resources}
        setError={props.setError}
        setLoading={props.setLoading}
        getNetworkRequest={props.getNetworkRequest}

      />
      {!props.searchBar && (
        <VideosHeader>
          <VideosBackContainer onClick={() => props.history.goBack()}>
            <Icon
              name="arrowLeft"
              style={{ marginRight: 6, transform: "rotate(90deg)" }}
            />
            <span>Back to collections</span>
          </VideosBackContainer>
          <h2
            style={{
              fontSize: "1.625rem",
              fontWeight: 600,
              textAlign: "center",
              color: "#fff",
              flex: 1,
              textTransform: "capitalize"
            }}
          >
            {props?.match?.params?.key?.replace(/-/gi, " ")}
          </h2>
        </VideosHeader>
      )}
      <MainContainer>
        <PerfectScroller>
          <VideoResult>
            {asset
              .filter(
                val =>
                  val.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
              )
              .map((val, key) => {
              const isAdded = Object.keys(props.resources).filter(data =>
                val?.url?.includes(props.resources?.[data]?.name)
              );
              return (
                <StockCard
                  setModal={data => {
                    setData(data);
                    setModal(true);
                  }}
                  setLoading={props.setLoading}
                  getNetworkRequest={props.getNetworkRequest}
                  url={val.url}
                  isAdded={!!isAdded.length}
                  key={key}
                  audio={true}
                />
              );
            })}
          </VideoResult>
        </PerfectScroller>
      </MainContainer>
    </VideosContainer>
  );
};

export default AudioCollection;
