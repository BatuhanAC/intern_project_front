import React from 'react'

const HoveredFood = ({mousePosition, hoveredFood}) => {
  return (
    <>
      <div style={{top: `${mousePosition.top}px`, left: `${mousePosition.left}px`}}
      className="absolute z-50 w-max bg-black text-white rounded-3xl p-4">
        {
          <div className='flex flex-col w-max'>
            <div className='grid grid-cols-1 gap-1 w-full h-full place-items-center'>
              {hoveredFood.name.toUpperCase()} - {hoveredFood.amount[0].name?.toUpperCase()}
              <table className='table-auto w-max'>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-end'>
                      Karbonhidrat:
                    </td>
                    <td>
                      {(hoveredFood.amount[0].carbonhydrate).toFixed(2)} gr
                    </td>
                  </tr>
                  <tr>
                    <td className='text-end'>
                      Protein:
                    </td>
                    <td>
                      {(hoveredFood.amount[0].protein).toFixed(2)} gr
                    </td>
                  </tr>
                  <tr>
                    <td className='text-end'>
                      Yağ:
                    </td>
                    <td>
                      {(hoveredFood.amount[0].fat).toFixed(2)} gr
                    </td>
                  </tr>
                  <tr>
                    <td className='text-end'>
                      Kalori: 
                    </td>
                    <td>
                      {(hoveredFood.amount[0].calorie).toFixed(2)} kcal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default HoveredFood