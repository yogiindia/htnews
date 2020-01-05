import axios from 'axios';

const HN_API_URL = `https://hacker-news.firebaseio.com/v0/`;
// https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty

export const getStoryIds = async () => {
    const ids = await axios.get(`${HN_API_URL}topstories.json`);
    return ids.data;
};
