import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

export default function RecipeScreen({ route }) {
  const { author, title, content } = route.params;
  return (
    <Card>
      <Card.Title title={title} subtitle={`Submitted by ${author}`} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
}
