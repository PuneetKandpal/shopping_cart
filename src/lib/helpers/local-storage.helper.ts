class LocalStorageHelper {
  static instance: LocalStorageHelper | null = null;

  public static getInstance() {
    if (!LocalStorageHelper.instance) {
      LocalStorageHelper.instance = new LocalStorageHelper();
    }
    return LocalStorageHelper.instance;
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

const LocalStorageHelperInstance = LocalStorageHelper.getInstance();

export default LocalStorageHelperInstance;
