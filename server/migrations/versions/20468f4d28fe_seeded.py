"""seeded

Revision ID: 20468f4d28fe
Revises: 
Create Date: 2023-12-04 20:53:57.384995

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '20468f4d28fe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('business_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('EIN', sa.String(), nullable=True),
    sa.Column('verified', sa.Boolean(), server_default='false', nullable=True),
    sa.Column('created_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('created_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('listings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product', sa.String(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('expiration_date', sa.Date(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('posted_by', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('vegan_safe', sa.Boolean(), server_default='true', nullable=True),
    sa.Column('non_dairy', sa.Boolean(), server_default='true', nullable=True),
    sa.Column('gluten_free', sa.Boolean(), server_default='true', nullable=True),
    sa.Column('nut_free', sa.Boolean(), server_default='true', nullable=True),
    sa.Column('soy_free', sa.Boolean(), server_default='true', nullable=True),
    sa.Column('created_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], name=op.f('fk_listings_business_id_businesses')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userlistings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.Date(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('listing_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['listing_id'], ['listings.id'], name=op.f('fk_userlistings_listing_id_listings')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_userlistings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userlistings')
    op.drop_table('listings')
    op.drop_table('users')
    op.drop_table('businesses')
    # ### end Alembic commands ###
