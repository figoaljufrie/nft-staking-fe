"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-white">
        <NavigationMenu.Root className="relative z-10">
          <NavigationMenu.List className="flex space-x-4 rounded-lg border border-stone-200 bg-white p-2 shadow-sm">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="px-4 py-2 text-stone-700 font-medium rounded-md hover:bg-stone-100 focus:outline-none">
                Item One
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="absolute left-0 mt-2 w-48 rounded-md border border-stone-200 bg-white shadow-lg p-2">
                <NavigationMenu.Link
                  href="#"
                  className="block px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-md"
                >
                  Link 1
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  );
}
