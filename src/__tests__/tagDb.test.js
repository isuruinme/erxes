/* eslint-env jest */
/* eslint-disable no-underscore-dangle */

import { connect, disconnect } from '../db/connection';
import { Tags, Users, EngageMessages } from '../db/models';
import { tagsFactory, engageMessageFactory } from '../db/factories';

beforeAll(() => connect());

afterAll(() => disconnect());

describe('Tags model', () => {
  let _tag;
  let _message;

  beforeEach(async () => {
    // Creating test data
    _tag = await tagsFactory();
    _message = await engageMessageFactory({});
  });

  afterEach(async () => {
    // Clearing test data
    await Tags.remove({});
    await EngageMessages.remove({});
  });

  test('Create tag', async () => {
    const tagObj = await Tags.createTag({
      name: `${_tag.name}1`,
      type: _tag.type,
      colorCode: _tag.colorCode,
    });

    expect(tagObj).toBeDefined();
    expect(tagObj.name).toEqual(`${_tag.name}1`);
    expect(tagObj.type).toEqual(_tag.type);
    expect(tagObj.colorCode).toEqual(_tag.colorCode);
  });

  test('Update tag', async () => {
    const tagObj = await Tags.updateTag(_tag._id, {
      name: _tag.name,
      type: _tag.type,
      colorCode: _tag.colorCode,
    });

    expect(tagObj).toBeDefined();
    expect(tagObj.name).toEqual(_tag.name);
    expect(tagObj.type).toEqual(_tag.type);
    expect(tagObj.colorCode).toEqual(_tag.colorCode);
  });

  test('Remove tag', async () => {
    const isDeleted = await Tags.removeTag([_tag.id]);
    expect(isDeleted).toBeTruthy();
  });

  test('Tags tag', async () => {
    const type = 'engageMessage';
    const targetIds = [_message._id];
    const tagIds = [_tag._id];

    await Tags.tagsTag(type, targetIds, tagIds);

    const messageObj = await EngageMessages.findOne({ _id: _message._id });
    const tagObj = await Tags.findOne({ _id: _tag._id });

    expect(tagObj.objectCount).toBe(1);
    expect(messageObj.tagIds[0]).toEqual(_tag.id);
  });
});
