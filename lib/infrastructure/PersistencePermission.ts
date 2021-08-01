export async function isPersisted() {
  return await navigator.storage.persisted();
}

export async function requestPersistence() {
  if (navigator.storage && navigator.storage.persist) {
    return await navigator.storage.persist();
  }

  return false;
}
