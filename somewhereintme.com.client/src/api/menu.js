export async function fetchMenuOptions() {
  const response = await fetch("/Menu/get-menu");
  if (!response.ok) {
    throw new Error(`Failed to load menu (${response.status})`);
  }
  return response.json();
}
