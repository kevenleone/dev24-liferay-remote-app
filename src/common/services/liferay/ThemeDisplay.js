export const getUserName = () => {
  try {
    // eslint-disable-next-line no-undef
    return Liferay.ThemeDisplay.getUserName();
  } catch (error) {
    return "John Doe";
  }
};

export const getUserEmailAddress = () => {
  try {
    // eslint-disable-next-line no-undef
    return Liferay.ThemeDisplay.getUserEmailAddress();
  } catch (error) {
    return "John Doe";
  }
};

export const getLiferaySiteName = () => {
  let siteName = "";

  try {
    // eslint-disable-next-line no-undef
    const { pathname } = new URL(Liferay.ThemeDisplay.getCanonicalURL());
    const [group, site] = pathname.split("/").filter(Boolean);
    siteName = `/${group}/${site}`;
  } catch (error) {
    console.warn("Not able to find Liferay PathName\n", error);
  }

  return siteName;
};
