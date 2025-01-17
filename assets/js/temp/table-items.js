export let fillTableItems = `
   <div class="bg-gray-800 shadow-md rounded-lg p-5 mb-4 flex items-center justify-between">
        <div>
          <h2 class="font-semibold text-lg">#NAME#</h2>
          <p class="text-gray-400 text-sm">#DESC#</p>
          <p class="mt-2"><span class="font-semibold text-xs">Stock:</span> <span id="" class="text-xs">#STOCK#</span></p>
          <p class="text-xs mt-2 text-gray-400">#DATE#</p>
        </div>
        
        <div class="flex space-x-2">
          <button
            onclick="showSellPopup('#SELL_ID#')"
            class="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition sm:px-4 sm:py-2 sm:text-base"
          >-</button>
          
         <button
            onclick="showRestockPopup('#ITEM_ID#')"
            class="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition sm:px-4 sm:py-2 sm:text-base"
          >+</button>
          
          <!-- Placeholder for Delete button -->
          #DELETE_BTN#
        </div>
      </div>
`;