import React, { useState } from 'react'

function CustomTab({ tabsNames = [], tabsComponents = [] }) {
  const [current, setCurrent] = useState(0)

  const changeTab = (index) => {
    setCurrent(index)
  }

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <div
          style={{ backgroundColor: '#90adbc', padding: 4, borderRadius: 5 }}
        >
          {tabsNames.map((tabName, i) => (
            <button
              style={{
                width: 120,
                borderRadius: 2,
                padding: 5,
                backgroundColor: i === current ? 'white' : '#b1b9c0',
                border: 'none',
              }}
              key={tabName + i}
              onClick={() => changeTab(i)}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>
      <div>
        {tabsComponents.map((tab, i) => (
          <div style={{ display: i === current ? 'block' : 'none' }}>{tab}</div>
        ))}
      </div>
    </div>
  )
}

export default CustomTab
