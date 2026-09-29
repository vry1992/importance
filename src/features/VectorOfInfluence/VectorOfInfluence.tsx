import { Card, Col, Divider, Row, Typography } from 'antd';
import { useAbilitiesSelectors } from '../Abilities/abilities.slice';
import { VectorOfInfluenceCreateForm } from './components/VectorOfInfluenceCreateForm';

export const VectorOfInfluence = () => {
  const { abilities } = useAbilitiesSelectors();

  const min = abilities.length ? +(3 / (4 * abilities.length)).toFixed(3) : 0;

  const max = abilities.length ? +(5 / (4 * abilities.length)).toFixed(3) : 0;

  return (
    <div>
      <Divider />
      <Row gutter={[8, 8]} justify="center">
        <Col xs={24} md={6}>
          <Card>
            <Typography.Text>
              <strong>{abilities.length}</strong> - критичних спроможностей
            </Typography.Text>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Typography.Text>
              <strong>{min}</strong> - мінімальне значення вектора-рядка
            </Typography.Text>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <Typography.Text>
              <strong>{max}</strong> - максимальне значення вектора-рядка
            </Typography.Text>
          </Card>
        </Col>
      </Row>
      <Divider />
      <VectorOfInfluenceCreateForm min={min} max={max} />
    </div>
  );
};
