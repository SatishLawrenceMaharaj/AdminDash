// import InventoryDash from '@/Components/InventoryDash/InventoryDash';
// import React from 'react';
// import { products, data, userData} from '@/Components/InventoryDash/inventoryData'; // Assuming the path to your data file is correct

// import { allData } from '../../../public/data'

// const InventoryPage: React.FC = () => {
//   return (
//     <div>
//       <InventoryDash products={products} data={data} userData={userData}/>
//     </div>
//   );
// };

// export default InventoryPage;

// InventoryPage.tsx
import InventoryDash from '@/Components/InventoryDash/InventoryDash';
import React from 'react';

import { allData } from '../../../public/data';

const InventoryPage: React.FC = () => {
  return (
    <div>
      <InventoryDash allData={allData} />
    </div>
  );
};

export default InventoryPage;
