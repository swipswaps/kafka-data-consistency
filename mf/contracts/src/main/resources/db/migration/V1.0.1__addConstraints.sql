-- pk
ALTER TABLE T_CONTRACTS
ADD PRIMARY KEY(ID);

-- pk
ALTER TABLE T_BLOCKS
ADD PRIMARY KEY(ID);

-- fk to contracts
ALTER TABLE T_BLOCKS
ADD CONSTRAINT FK_CONTRACT_ID
FOREIGN KEY (CONTRACT_ID) REFERENCES T_CONTRACTS(ID);

-- parent references other existing rows in same table
ALTER TABLE T_BLOCKS
ADD CONSTRAINT FK_PARENT_ID
FOREIGN KEY (PARENT_ID) REFERENCES T_BLOCKS(ID);
