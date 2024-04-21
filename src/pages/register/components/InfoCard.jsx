import React from 'react'
import { Button, Card, Typography, Form, Input, Checkbox, Space } from 'antd';

const InfoCard = ({ agree, onInfoCheck, onAgreed }) => {
  return (

    <div>
      <div className='cs-info-box'>
        <Typography.Title level={5} type='secondary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur animi facere dolorum earum eaque fugit reiciendis et aut assumenda, officia dolor dicta necessitatibus nulla harum incidunt, ipsum nemo ea!
        </Typography.Title>

        <span>
          <Checkbox className='cs-rm-5' checked={agree} onClick={onInfoCheck} />

          <Typography.Text level={5}>
            I Aknowledge and agree to the above terms and conditions.
          </Typography.Text>
        </span>

        <Button onClick={onAgreed} className='cs-lm-5' type='primary' disabled={!agree}>
          Agree
        </Button>
      </div>
    </div>

  )
}

export default InfoCard