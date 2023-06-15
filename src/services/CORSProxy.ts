const CORSProxy = (url: string) => {
  return "https://corsproxy.io/?" + encodeURIComponent(url);
};

export default CORSProxy;
