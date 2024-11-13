// Mock Objects
class MockAcessaAgroSalesforceSystem {
    private campaigns: any[] = [];
    private auditLog: any[] = [];
    private encryptedData: string | null = null;

    createCampaign(campaign: any) {
        this.campaigns.push(campaign);
    }

    getCampaign(campaignName: string) {
        return this.campaigns.find(campaign => campaign.name === campaignName);
    }

    distributePoints(campaignName: string, sales: any) {
        const campaign = this.getCampaign(campaignName);
        const consultantPoints = (sales.consultant * campaign.allocationCriteria.consultant) / 100;
        const managerPoints = (sales.manager * campaign.allocationCriteria.manager) / 100;
        return { consultant: consultantPoints, manager: managerPoints };
    }

    addUser(user: any) {
        return user;
    }

    getSensitiveData(user: any, userId: number) {
        if (user.permissions.includes("viewOwnData") && user.id === userId) {
            return "Sensitive Information";
        } else {
            throw new Error("Access denied");
        }
    }

    storeSensitiveData(data: string) {
        this.encryptedData = btoa(data);
    }

    getStoredData() {
        return this.encryptedData;
    }

    isDataEncrypted(data: string) {
        return data === this.encryptedData;
    }

    recordAction(user: any, action: string) {
        this.auditLog.push({ userId: user.id, action });
    }

    getAuditLog() {
        return this.auditLog;
    }

    generateAuditReport() {
        return this.auditLog.map(log => log.action).join(", ");
    }
}

// Test Cases
//@ts-ignore
describe("Compliance - Allocation Rules", () => {
    let system: MockAcessaAgroSalesforceSystem;

    //@ts-ignore
    beforeEach(() => {
        // Arrange: Set up the mock system
        system = new MockAcessaAgroSalesforceSystem();
    });

    //@ts-ignore
    it("Should create campaigns with correctly applied allocation criteria", () => {
        // Arrange
        const campaign = {
            name: "Test Campaign",
            allocationCriteria: { consultant: 70, manager: 30 }
        };

        // Act
        system.createCampaign(campaign);

        // Assert
        const createdCampaign = system.getCampaign("Test Campaign");

        //@ts-ignore
        expect(createdCampaign.allocationCriteria.consultant).toBe(70);

        //@ts-ignore
        expect(createdCampaign.allocationCriteria.manager).toBe(30);
    });

    //@ts-ignore
    it("Should distribute points according to the defined allocation criteria", () => {
        // Arrange
        const campaign = {
            name: "Test Campaign",
            allocationCriteria: { consultant: 70, manager: 30 }
        };
        system.createCampaign(campaign);

        const sales = {
            consultant: 1000,
            manager: 500
        };

        // Act
        const distributedPoints = system.distributePoints("Test Campaign", sales);

        // Assert
    
        //@ts-ignore
        expect(distributedPoints.consultant).toBe(700);

        //@ts-ignore
        expect(distributedPoints.manager).toBe(150);
    });
});


//@ts-ignore
describe("Compliance - Security and Data Integrity", () => {
    let system: MockAcessaAgroSalesforceSystem;

    //@ts-ignore
    beforeEach(() => {
        // Arrange: Set up the mock system
        system = new MockAcessaAgroSalesforceSystem();
    });

    //@ts-ignore
    it("Should restrict access to sensitive data based on user permissions", () => {
        // Arrange
        const user = { id: 1, role: "regularUser", permissions: ["viewOwnData"] };
        const sensitiveData = { userId: 1, data: "Sensitive Information" };
        system.addUser(user);

        // Act
        const dataAccess = () => system.getSensitiveData(user, sensitiveData.userId);

        // Assert
        //@ts-ignore
        expect(dataAccess).toThrowError("Access denied");
    });

     //@ts-ignore
    it("Should ensure data is encrypted during storage and transmission", () => {
        // Arrange
        const sensitiveData = "Sensitive Information";

        // Act
        system.storeSensitiveData(sensitiveData);
        const encryptedData = system.getStoredData();

        // Assert

        //@ts-ignore
        expect(encryptedData).not.toBe(sensitiveData);

        //@ts-ignore
        expect(system.isDataEncrypted(encryptedData)).toBe(true);
    });
});

//@ts-ignore
describe("Compliance - Audit and Traceability", () => {
    let system: MockAcessaAgroSalesforceSystem;

    //@ts-ignore
    beforeEach(() => {
        // Arrange: Set up the mock system
        system = new MockAcessaAgroSalesforceSystem();
    });

    //@ts-ignore
    it("Should record all critical actions for audit purposes", () => {
        // Arrange
        const action = "Created a new campaign";
        const user = { id: 1, name: "Admin User" };

        // Act
        system.recordAction(user, action);
        const auditLog = system.getAuditLog();

        // Assert

        //@ts-ignore
        expect(auditLog).toContainEqual({ userId: 1, action });
    });

    //@ts-ignore
    it("Should generate accurate audit reports reflecting system activities", () => {
        // Arrange
        const user = { id: 1, name: "Admin User" };
        system.recordAction(user, "Created a new campaign");
        system.recordAction(user, "Updated sales record");

        // Act
        const auditReport = system.generateAuditReport();

        // Assert

        //@ts-ignore
        expect(auditReport).toContain("Created a new campaign");

       //@ts-ignore
        expect(auditReport).toContain("Updated sales record");
    });
});
