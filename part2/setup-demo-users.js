const db = require('./models/db');

async function setupDemoUsers() {
    try {
        console.log('Setting up demo users...');

        // Check if demo users already exist
        const [existingUsers] = await db.query('SELECT email FROM Users WHERE email IN (?, ?)', [
            'owner@example.com',
            'walker@example.com'
        ]);

        if (existingUsers.length > 0) {
            console.log('Demo users already exist. Skipping setup.');
            return;
        }

        // Insert demo users
        const demoUsers = [
            {
                username: 'DemoOwner',
                email: 'owner@example.com',
                password_hash: 'password', // In production, this should be hashed
                role: 'owner'
            },
            {
                username: 'DemoWalker',
                email: 'walker@example.com',
                password_hash: 'password', // In production, this should be hashed
                role: 'walker'
            }
        ];

        for (const user of demoUsers) {
            await db.query(`
        INSERT INTO Users (username, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `, [user.username, user.email, user.password_hash, user.role]);

            console.log(`Created ${user.role}: ${user.email}`);
        }

        // Add some demo dogs for the owner
        const [ownerResult] = await db.query('SELECT user_id FROM Users WHERE email = ?', ['owner@example.com']);
        if (ownerResult.length > 0) {
            const ownerId = ownerResult[0].user_id;

            await db.query(`
        INSERT INTO Dogs (owner_id, name, size)
        VALUES (?, ?, ?)
      `, [ownerId, 'Buddy', 'medium']);

            await db.query(`
        INSERT INTO Dogs (owner_id, name, size)
        VALUES (?, ?, ?)
      `, [ownerId, 'Max', 'large']);

            console.log('Added demo dogs for owner');
        }

        console.log('Demo setup completed successfully!');
        console.log('\nDemo Accounts:');
        console.log('Owner: owner@example.com / password');
        console.log('Walker: walker@example.com / password');

    } catch (error) {
        console.error('Error setting up demo users:', error);
    } finally {
        process.exit(0);
    }
}

setupDemoUsers(); 